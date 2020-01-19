package com.example.android.exercisestracking;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import model.IModel;
import model.Model;
import view.IView;
import view.View;
import viewModel.IViewModel;
import viewModel.ViewModel;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        new Thread() {
            public void run() {
                int i = 0 ;
                    try {
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                System.out.println(Thread.currentThread().getName());
                                IModel m = new Model();
                                IView v = new View();
                                startView();
                                IViewModel vm = new ViewModel();
                                v.setViewModel(vm);
                                vm.setModel(m);

                            }
                        });
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
        }.start();
    }

    public void startView() {
        setContentView(R.layout.activity_main);

        webView = (WebView)findViewById(R.id.webview1);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/main.html");

    }


}
