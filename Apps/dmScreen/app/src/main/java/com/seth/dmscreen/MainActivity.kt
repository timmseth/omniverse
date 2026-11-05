package com.seth.dmscreen

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

/**
 * dmScreen: a thin WebView shell. The whole UI is plain HTML/CSS/JS in assets/.
 * The shell only provides storage, clipboard, links and a network fetch for the
 * dungeon index, so the interface can change without touching Kotlin.
 */
class MainActivity : Activity() {

    private lateinit var web: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        web = WebView(this)
        web.setBackgroundColor(0xFF15131A.toInt())
        setContentView(web)

        with(web.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true          // needed for file:///android_asset
            allowContentAccess = false
            @Suppress("DEPRECATION")
            allowFileAccessFromFileURLs = false
            @Suppress("DEPRECATION")
            allowUniversalAccessFromFileURLs = false
            cacheMode = WebSettings.LOAD_DEFAULT
            textZoom = 100
            builtInZoomControls = false
            setSupportZoom(false)
        }

        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val url = request.url
                if (url.scheme == "file") return false
                openExternal(url.toString())
                return true
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
            }
        }

        web.addJavascriptInterface(Bridge(), "Android")
        if (savedInstanceState == null) {
            web.loadUrl("file:///android_asset/index.html")
        } else {
            web.restoreState(savedInstanceState)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (web.canGoBack()) web.goBack() else super.onBackPressed()
    }

    override fun onDestroy() {
        web.removeJavascriptInterface("Android")
        web.destroy()
        super.onDestroy()
    }

    private fun openExternal(url: String) {
        val uri = Uri.parse(url)
        if (uri.scheme != "https" && uri.scheme != "http") return
        try {
            startActivity(Intent(Intent.ACTION_VIEW, uri))
        } catch (_: Exception) {
            // no browser installed
        }
    }

    private fun readFile(name: String): String {
        val f = File(filesDir, name)
        return if (f.exists()) f.readText(Charsets.UTF_8) else ""
    }

    private fun writeFile(name: String, text: String) {
        // write to a temp file and rename so a crash never leaves a half-written file
        val tmp = File(filesDir, "$name.tmp")
        tmp.writeText(text, Charsets.UTF_8)
        val dst = File(filesDir, name)
        if (!tmp.renameTo(dst)) {
            dst.writeText(text, Charsets.UTF_8)
            tmp.delete()
        }
    }

    private inner class Bridge {
        @JavascriptInterface
        fun version(): String = try {
            packageManager.getPackageInfo(packageName, 0).versionName ?: "?"
        } catch (_: Exception) {
            "?"
        }

        @JavascriptInterface
        fun loadState(): String = readFile("state.json")

        @JavascriptInterface
        fun saveState(json: String) = writeFile("state.json", json)

        @JavascriptInterface
        fun loadData(): String = readFile("dungeons.json")

        @JavascriptInterface
        fun saveData(json: String) = writeFile("dungeons.json", json)

        @JavascriptInterface
        fun openUrl(url: String) {
            runOnUiThread { openExternal(url) }
        }

        @JavascriptInterface
        fun copyText(text: String) {
            runOnUiThread {
                val cm = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                cm.setPrimaryClip(ClipData.newPlainText("dmScreen", text))
            }
        }

        /** Fetches an https URL on a worker thread and calls window.__dmFetch(ok, text). */
        @JavascriptInterface
        fun fetchText(url: String) {
            Thread {
                var ok = false
                var payload: String
                try {
                    val u = URL(url)
                    require(u.protocol == "https") { "https only" }
                    val c = u.openConnection() as HttpURLConnection
                    c.connectTimeout = 15000
                    c.readTimeout = 20000
                    c.setRequestProperty("Accept", "application/json")
                    c.setRequestProperty("Cache-Control", "no-cache")
                    if (c.responseCode != 200) throw IllegalStateException("HTTP " + c.responseCode)
                    val buf = ByteArrayOutputStream()
                    c.inputStream.use { ins ->
                        val chunk = ByteArray(16 * 1024)
                        while (true) {
                            val n = ins.read(chunk)
                            if (n < 0) break
                            buf.write(chunk, 0, n)
                            if (buf.size() > 16 * 1024 * 1024) throw IllegalStateException("file too large")
                        }
                    }
                    payload = buf.toString("UTF-8")
                    ok = true
                } catch (e: Exception) {
                    payload = e.message ?: e.javaClass.simpleName
                }
                val js = "window.__dmFetch && window.__dmFetch(" + ok + "," + JSONObject.quote(payload) + ")"
                runOnUiThread { web.evaluateJavascript(js, null) }
            }.start()
        }
    }
}
