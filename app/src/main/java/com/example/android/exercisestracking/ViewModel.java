package com.example.android.exercisestracking;

import android.app.Activity;
import android.webkit.WebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ViewModel extends Activity {

    Model model;
    WebView webView;
    ExecutorService pool;

    ViewModel(WebView webView, Model model){
        this.model = model;
        this. webView = webView;
        pool = Executors.newFixedThreadPool(4);
    }

    @android.webkit.JavascriptInterface
    public void fetchMyExercises () {

        final String toShow = model.returnString();
        
        pool.submit(new Runnable() {
            @Override
            public void run() {


                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {


                        webView.evaluateJavascript("showExercises('"+toShow+"')", null);
                   
                    }
                });
            }
        });
    }
}
