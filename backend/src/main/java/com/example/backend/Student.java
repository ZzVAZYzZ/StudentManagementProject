/* Student Management System (SMS) */
// Lớp Student
package com.example.backend;

import java.io.Serializable;

public class Student implements Serializable {

    private final int sid; // không cho phép cập nhật mã số sinh viên
    private String firstName;
    private String lastName;
    private String major;
    private double gpa;

    public Student(int sid, String lastName, String firstName, String major, double gpa) {
        this.sid = sid;
        this.lastName = lastName;
        this.firstName = firstName;
        this.major = major;
        this.gpa = gpa;
    }

    public int getSid() {
        return sid;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    @Override
    public String toString() {
        String line = String.format("| %-6d| %-20s | %-10s | %-5s | %4.1f |", sid, lastName, firstName, major, gpa);
        return line;
    }

    // 2 sinh viên giống nhau khi cùng lớp Student và cùng số sid
    // sử dụng để so sánh/tìm kiếm một đối tượng Student trong ArrayList
    @Override
    public boolean equals(Object obj) {
        return false;
    }

}
