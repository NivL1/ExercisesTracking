package com.example.android.exercisestracking;

import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;

import org.json.JSONObject;

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
        final String confirmation = databaseHelper.commitExerciseToDB(trainType, exerciseType, time, distance);

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("confirm('"+confirmation+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void fetchTrainsFromDB(String flag) {
        String[] trainsArr = databaseHelper.getTrainTypes();
        StringBuilder bf = new StringBuilder();
        bf.append(flag);
        bf.append("|");
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

    @android.webkit.JavascriptInterface
    public void fetchCommittedExercisesFromDb() {
        String[][] committedExercisesArr = databaseHelper.getCommittedExercises();

        StringBuilder bf = new StringBuilder();
        for (String[] strings : committedExercisesArr) {
            for (String string : strings) {
                bf.append(string);
                bf.append("|");
            }
        }
        final String committedExerciseTableString = bf.toString();

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("putCommittedExercises('"+committedExerciseTableString+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void getCommittedExercisesCols() {
        final int colsNum = databaseHelper.getCommittedExercisesCols();

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("setCommittedExercisesCols('"+colsNum+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void getCommittedExercisesRows() {
        final int rowsNum = databaseHelper.getCommittedExercisesRows();

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("setCommittedExercisesRows('"+rowsNum+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void addOptionTrainJava(String valueToAdd) {
        final String confirmation = databaseHelper.addOptionTrainToDB(valueToAdd);

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("confirm('"+confirmation+"')", null);
                    }
                });
            }
        });

    }

    @android.webkit.JavascriptInterface
    public void addOptionExerciseJava(String valueToAdd, String trainType) {
        final String confirmation = databaseHelper.addOptionExerciseToDB(valueToAdd, trainType);

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("confirm('"+confirmation+"')", null);
                    }
                });
            }
        });
    }

    @android.webkit.JavascriptInterface
    public void getCommittedExercisesCountJava(){
        final String numRows = databaseHelper.getExercisesCountFromDB();

        pool.submit(new Runnable() {
            @Override
            public void run() {
                ViewModel.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.evaluateJavascript("setNumberOfRows('"+numRows+"')", null);
                    }
                });
            }
        });
    }
}
