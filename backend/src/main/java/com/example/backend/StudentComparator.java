
package com.example.backend;

import java.util.Comparator;

class IdComparator implements Comparator<Student> {

    @Override
    public int compare(Student s1, Student s2) {
        return Integer.compare(s1.getSid(), s2.getSid());
    }

}

class GpaComparator implements Comparator<Student> {

    @Override
    public int compare(Student s1, Student s2) {
        return Double.compare(s1.getGpa(), s2.getGpa());
    }

}

class FirstNameComparator implements Comparator<Student> {

    @Override
    public int compare(Student s1, Student s2) {
       return s1.getFirstName().compareToIgnoreCase(s2.getFirstName());
    }
}
