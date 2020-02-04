package com.example.android.exercisestracking;

import android.app.Activity;
import android.webkit.WebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ViewModel extends Activity implements IViewModel {

    Model model;
    WebView webView;
    ExecutorService pool;

    ViewModel(WebView webView, Model model){
        this.model = model;
        this. webView = webView;
        pool = Executors.newFixedThreadPool(4);
    }

    @android.webkit.JavascriptInterface
    public void addExercise (String trainType, String exerciseType, String time, String distance) {

        final String toShow = model.addExerciseToDB(trainType,exerciseType,time,distance);
        
        pool.submit(new Runnable() {
            @Override
            public void run() {


                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        webView.evaluateJavascript("showStr('"+toShow+"')", null);
                   
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void fetchTrainsFromDB() {
        String[] trainsArr = model.getTrainTypes();
        StringBuffer bf = new StringBuffer();
        for (String str: trainsArr) {
            bf.append(str);
            bf.append("|");
        }
        final String trainsString = bf.toString();


        pool.submit(new Runnable() {
            @Override
            public void run() {


                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                            webView.evaluateJavascript("showTrains('"+trainsString+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void fetchExercisesFromDB(String value) {
        String[] exercisesArr = model.getExercises(value);
        StringBuffer bf = new StringBuffer();
        for (String str: exercisesArr) {
            bf.append(str);
            bf.append("|");
        }
        final String exercisesString = bf.toString();


        pool.submit(new Runnable() {
            @Override
            public void run() {


                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("showExercises('"+exercisesString+"')", null);
                    }
                });
            }
        });
    }
}
