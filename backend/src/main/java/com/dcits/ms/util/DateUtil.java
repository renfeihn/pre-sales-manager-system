package com.dcits.ms.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by renfei on 2017/11/6.
 */
public class DateUtil {

    public static final String yyyyMMdd = "yyyy-MM-dd";

    public static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(yyyyMMdd);

    public static Date getDate(String dateStr) {
        try {
            return simpleDateFormat.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getYyyyMMdd(Date date) {
        return simpleDateFormat.format(date);
    }

    /**
     * 获取给定日期的日
     *
     * @param date
     * @return
     */
    public static int getDayOfMonth(Date date) {
        Calendar ca = Calendar.getInstance();
        ca.setTime(date);
        return ca.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * 获取给定日期的最后一天日期
     *
     * @param date
     * @return
     */
    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date lastDayOfMonth = calendar.getTime();
        return lastDayOfMonth;
    }

    /**
     * 将日期转换为日历
     *
     * @param date 日期
     * @return 日历
     */
    private static Calendar convert(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }


    /**
     * 获取当年的第一天
     * @return
     */
    public static Date getCurrYearFirst(){
        Calendar currCal=Calendar.getInstance();
        int currentYear = currCal.get(Calendar.YEAR);
        return getYearFirst(currentYear);
    }

    /**
     * 获取当年的最后一天
     * @return
     */
    public static Date getCurrYearLast(){
        Calendar currCal=Calendar.getInstance();
        int currentYear = currCal.get(Calendar.YEAR);
        return getYearLast(currentYear);
    }

    /**
     * 获取某年第一天日期
     * @param year 年份
     * @return Date
     */
    public static Date getYearFirst(int year){
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        Date currYearFirst = calendar.getTime();
        return currYearFirst;
    }

    /**
     * 获取某年最后一天日期
     * @param year 年份
     * @return Date
     */
    public static Date getYearLast(int year){
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        Date currYearLast = calendar.getTime();

        return currYearLast;
    }
}
