package com.dcits.ms.util;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by renfei on 2017/11/7.
 */
public class BusiUtil {

    public static boolean isNull(Object o) {
        if (o == null) {
            return true;
        }
        boolean flag = false;
        if (o instanceof String) {
            if ("".equals(o.toString().trim()) || o.toString().length() == 0) {
                flag = true;
            }
        } else if (o instanceof List) {
            if(((List)o).isEmpty() || ((List)o).size() == 0){
                flag = true;
            }
        } else if (o instanceof Map) {
            if(((Map)o).isEmpty() || ((Map)o).size() == 0){
                flag = true;
            }
        }

        return flag;
    }


    public static boolean isNotNull(Object o) {
        return !isNull(o);
    }

    public static void printLine(Object obj){
        System.out.println(obj);
    }

    public static void printInLine(Object obj){
        System.out.print(obj);
    }

}
