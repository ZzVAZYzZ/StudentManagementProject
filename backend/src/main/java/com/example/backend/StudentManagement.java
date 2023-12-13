/* Student Management System (SMS) */
// Lớp StudentManagement: quản lý thông tin các sinh viên
// (thêm, xóa, sửa, sắp xếp, lưu file...)
package com.example.backend;

import java.io.EOFException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Scanner;

public class StudentManagement implements Manageable {

    // Danh sách các sinh viên
    static String FILE_NAME = "data.bin";
    private ArrayList<Student> studentList;

    public StudentManagement() {
        studentList = new ArrayList();
    }

    public StudentManagement(ArrayList studentList) {
        this.studentList = studentList;
    }
    
    public int getLastId() {
        int lastId = 1000;
        //Phát sinh id tự động tăng dần
        return lastId;
    }

    public Student[] getStudentArray() {
        return studentList.toArray(new Student[0]);
    }

    public ArrayList<Student> getStudentList() {
        return studentList;
    }

    @Override
    public void addStudent(Student student) {
        studentList.add(student);
    }

    @Override
    public boolean deleteStudentById(int sid) {
        int idToDelete = sid;
        // Xóa sinh viên từ list
        if(studentList.removeIf(student -> student.getSid() == idToDelete)){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void updateStudentById(int sid) {
        int updateId = sid;
        // Cập nhật thông tin sinh viên
        for (Student student : studentList) {
            if (student.getSid() == updateId) {
                Scanner ip = new Scanner(System.in);                
                System.out.println("Updated student with ID " + updateId + ":"); 
                // Ten dem
                System.out.print("New last name: ");
                String newLastName = ip.nextLine();
                student.setLastName(newLastName); 
                //Ten chinh
                System.out.print("New first name: ");
                String newFirstName = ip.nextLine();
                student.setFirstName(newFirstName); 
                //Nghe
                System.out.print("New major: ");
                String newMajor = ip.nextLine();
                student.setMajor(newMajor);
                //Diem
                System.out.print("New GPA: ");
                float newGPA = ip.nextFloat();
                student.setGpa(newGPA);
                System.out.println("Updated successfully.");
                return;
            }
        }
        System.out.println("No student found.");
    }

    @Override
    public void printAllStudent() {
        for (Student student : studentList) {
            System.out.println(student);
        }
    }

    @Override
    public void findStudentByMajor(String major) {
        String findMajor = major;
        System.out.println("Students study in'" + findMajor + "':");
        for (Student student : studentList) {
            if (student.getMajor().equals(findMajor)) {
                System.out.println(student);
            }
        }
    }

    @Override
    public void findStudentById(int sid) {
        int findId = sid;
        for (Student student : studentList) {
            if (student.getSid() == findId) {
                System.out.println(student);
                return;
            }
        }
        System.out.println("No student found.");
    }

    @Override
    public void loadFromFile() {
        studentList.clear();
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME));) {

            Object obj = null;

            while ((obj = ois.readObject()) != null) {
                Student student;
                student = (Student) obj;
                this.studentList.add(student);
            }

        } catch (EOFException eofe) {
            System.out.println("Done.");

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void saveToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME));) {
            for (Student student : studentList) {
                oos.writeObject(student);
            }
            oos.flush();
            oos.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void sortById() {
        studentList.sort(new IdComparator());
        System.out.println("Students sorted by ID:");
        printAllStudent();
    }

    @Override
    public void sortByGpa() {
        studentList.sort(new GpaComparator());
        System.out.println("Students sorted by GPA :");
        printAllStudent();
    }

    @Override
    public void sortByFirstName() {
        studentList.sort(new FirstNameComparator());
        System.out.println("Students sorted by First Name:");
        printAllStudent();
    }
}
