package com.example.android.exercisestracking;

import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ViewModel extends Activity implements IViewModel {

    DatabaseHelper databaseHelper;
    WebView webView;
    ExecutorService pool;

    ViewModel(WebView webView, DatabaseHelper databaseHelper){
        this.databaseHelper = databaseHelper;
        this.webView = webView;
        pool = Executors.newFixedThreadPool(4);
    }

    @android.webkit.JavascriptInterface
    public void commitExerciseJava(String trainType, String exerciseType, String time, String distance) {
        if ((trainType != null) && (exerciseType != null)) {
            final String toShow = databaseHelper.commitExerciseToDB(trainType, exerciseType, time, distance);
        }
    }

    @android.webkit.JavascriptInterface
    public void fetchTrainsFromDB() {
        String[] trainsArr = databaseHelper.getTrainTypes();
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
    public void fetchExercisesFromDB(String selectedTrain) {
        String[] exercisesArr = databaseHelper.getExercises(selectedTrain);
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
