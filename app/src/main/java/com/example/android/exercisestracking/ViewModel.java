package com.example.android.exercisestracking;

import android.app.Activity;
import android.webkit.WebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ViewModel extends Activity implements IViewModel {

    DatabaseHelper model;
    WebView webView;
    ExecutorService pool;

    ViewModel(WebView webView, DatabaseHelper model){
        this.model = model;
        this.webView = webView;
        pool = Executors.newFixedThreadPool(4);
    }

    @android.webkit.JavascriptInterface
    public void commitExerciseJava(String trainType, String exerciseType, String time, String distance) {

        final String toShow = model.commitExerciseToDB(trainType,exerciseType,time,distance);
        
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
        StringBuilder bf = new StringBuilder();
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
        StringBuilder bf = new StringBuilder();
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
