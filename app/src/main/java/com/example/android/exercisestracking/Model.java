package com.example.android.exercisestracking;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.provider.BaseColumns;
import android.widget.ListAdapter;
import android.widget.SimpleCursorAdapter;

import java.util.ArrayList;

public class Model extends SQLiteOpenHelper implements IModel {

    private static final String DATABASE_NAME = "exercises_db";
    public static final String TRAIN_NAME = "train_name";
    public static final String COUNTRY_POPULATION = "population";
    public static final String TABLE_NAME = "train_type";
    public static final String TABLE_NAME2 = "exercise_type";
    public static final String EXERCISE_NAME = "exercise_name";

    public Model(Context context) {
        super(context, DATABASE_NAME, null, 1);

    }

    public String addExerciseToDB(String trainType, String exerciseType, String time, String distance){
        StringBuffer bf = new StringBuffer();
            bf.append(trainType);
            bf.append(exerciseType);
            bf.append(time);
            bf.append(distance);
        final String result = bf.toString();
        return result;
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        //trains table
        database.execSQL("CREATE TABLE "+ TABLE_NAME
                +" ("+ BaseColumns._ID+" INTEGER PRIMARY KEY AUTOINCREMENT, " +TRAIN_NAME+" TEXT);");
        ContentValues values = new ContentValues();
        values.put(TRAIN_NAME, "Aerobic");
        database.insert(TABLE_NAME, null, values);
        values.put(TRAIN_NAME, "Anaerobic");
        database.insert(TABLE_NAME, null, values);
        values.put(TRAIN_NAME, "Anaerobic - Weightlifting");
        database.insert(TABLE_NAME, null, values);

        //exercises table
        database.execSQL("CREATE TABLE "+ TABLE_NAME2
                +" ("+ BaseColumns._ID+" INTEGER PRIMARY KEY AUTOINCREMENT, " +TRAIN_NAME+" TEXT, " +EXERCISE_NAME+" TEXT);");
        values.put(TRAIN_NAME, "Aerobic");
        values.put(EXERCISE_NAME, "Running");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Aerobic");
        values.put(EXERCISE_NAME, "Walking");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Aerobic");
        values.put(EXERCISE_NAME, "Swimming");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Aerobic");
        values.put(EXERCISE_NAME, "Cycling");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Aerobic");
        values.put(EXERCISE_NAME, "Boxing");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic");
        values.put(EXERCISE_NAME, "Push-ups");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic");
        values.put(EXERCISE_NAME, "Pull-ups");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic");
        values.put(EXERCISE_NAME, "Squats");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic - Weightlifting");
        values.put(EXERCISE_NAME, "Bench-press");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic - Weightlifting");
        values.put(EXERCISE_NAME, "Overhead-press");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic - Weightlifting");
        values.put(EXERCISE_NAME, "Push-press");
        database.insert(TABLE_NAME2, null, values);
        values.put(TRAIN_NAME, "Anaerobic - Weightlifting");
        values.put(EXERCISE_NAME, "Deadlift");
        database.insert(TABLE_NAME2, null, values);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }

    public String[] getTrainTypes() {
        ArrayList<String> trainsList = new ArrayList<String>();

        SQLiteDatabase db = this.getReadableDatabase();

        String[] projection = {
                TRAIN_NAME
        };

        Cursor cursor = db.query(
                TABLE_NAME,   // The table to query
                projection,             // The array of columns to return (pass null to get all)
                null,              // The columns for the WHERE clause
                null,          // The values for the WHERE clause
                null,                   // don't group the rows
                null,                   // don't filter by row groups
                null               // The sort order
        );

        //extracting the data to a list
        if(cursor.moveToFirst()) {
            do {
                trainsList.add(cursor.getString(cursor.getColumnIndex("train_name")));
            } while(cursor.moveToNext());
        }
        //convert the list to array
        String[] trainsArr = new String[trainsList.size()];
        trainsArr = trainsList.toArray(trainsArr);

        cursor.close();
        db.close();
        return trainsArr;
    }

    public String[] getExercises(String value) {
        ArrayList<String> exercisesList = new ArrayList<String>();

        SQLiteDatabase db = this.getReadableDatabase();

        String[] projection = {
                EXERCISE_NAME,
                TRAIN_NAME
        };

        String selection = TRAIN_NAME + " = ?";
        String[] selectionArgs = { value };

        String sortOrder = EXERCISE_NAME + " ASC";

        Cursor cursor = db.query(
                TABLE_NAME2,   // The table to query
                projection,             // The array of columns to return (pass null to get all)
                selection,              // The columns for the WHERE clause
                selectionArgs,          // The values for the WHERE clause
                null,                   // don't group the rows
                null,                   // don't filter by row groups
                sortOrder               // The sort order
        );

        //extracting the data to a list
        if(cursor.moveToFirst()) {
            do {
                exercisesList.add(cursor.getString(cursor.getColumnIndex("exercise_name")));
            } while(cursor.moveToNext());
        }
        //convert the list to array
        String[] exercisesArr = new String[exercisesList.size()];
        exercisesArr = exercisesList.toArray(exercisesArr);

        cursor.close();
        db.close();
        return exercisesArr;
    }
}
