package com.example.android.exercisestracking;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

public class MainActivity extends AppCompatActivity {

    @SuppressWarnings("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        Model model = new Model();
        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        setContentView(webView);
        webView.loadUrl("file:///android_asset/main.html");
        ViewModel viewModel = new ViewModel(webView, model);
        webView.addJavascriptInterface(viewModel, "vm");
    }
//
//        new Thread() {
//            public void run() {
//                int i = 0 ;
//                    try {
//                        runOnUiThread(new Runnable() {
//
//                            @Override
//                            public void run() {
//                                System.out.println(Thread.currentThread().getName());
//                                IModel m = new Model();
//                                IView v = new View();
//                                startView();
//                                IViewModel vm = new ViewModel();
//                                v.setViewModel(vm);
//                                vm.setModel(m);
//
//                            }
//                        });
//                        Thread.sleep(300);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//        }.start();
//    }



}

