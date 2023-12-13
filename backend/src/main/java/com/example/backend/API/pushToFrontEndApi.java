package com.example.backend.API;


import com.example.backend.Student;
import com.example.backend.StudentManagement;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/pushToFrontEndApi")
@CrossOrigin(origins = "*")
public class pushToFrontEndApi {
    static StudentManagement sm = new StudentManagement();
    //API Load
    @GetMapping("/getStudentArray")
    public ArrayList<Student> getArray(){
        ArrayList<Student> loadedStudentList = deserializeStudentList("data.ser");
        ArrayList<Student> studentList ;
        studentList = loadedStudentList;
        serializeStudentList(studentList, "studentList.ser");
        return loadedStudentList;
    }
    //API refresh
    @GetMapping("/refreshStudentArray")
    public ArrayList<Student> refreshArray(){
        ArrayList<Student> refreshStudentList = deserializeStudentList("studentList.ser");
        System.out.println(refreshStudentList);
        return refreshStudentList;
    }
    //API Them sinh vien
    @PostMapping("/addStudentArray")
    public ArrayList<Student> addStudentArray(@RequestBody Student newStudent){
        ArrayList<Student> loadedStudentList = deserializeStudentList("studentList.ser");
        sm.getStudentList().clear();;
        sm.addStudent(newStudent);
        ArrayList<Student> studentList = sm.getStudentList();
        ArrayList<Student> result = concatenateLists(loadedStudentList, studentList);
        serializeStudentList(result, "studentList.ser");
        return loadedStudentList;
    }

    //API Xoa sinh vien
    @PostMapping("/deleteStudentArray")
    public ArrayList<Student> deleteStudentArray(@RequestBody int deleteStudent){
        ArrayList<Student> loadedStudentList = deserializeStudentList("studentList.ser");
        loadedStudentList.removeIf(student -> student.getSid() == deleteStudent);
        serializeStudentList(loadedStudentList, "studentList.ser");
        return loadedStudentList;
    }

    //API Cap nhat sinh vien
    @PostMapping("/updateStudentArray")
    public ArrayList<Student> updateStudentArray(@RequestBody Student updateStudent){
        ArrayList<Student> loadedStudentList = deserializeStudentList("studentList.ser");
        updateStudentById(updateStudent,loadedStudentList);
        serializeStudentList(loadedStudentList, "studentList.ser");
        return loadedStudentList;
    }

    //API Luu file sinh vien
    @PostMapping("/saveStudentArray")
    public ArrayList<Student> saveStudentArray(@RequestBody boolean saveStudentArrayStudent){
        ArrayList<Student> loadedStudentList = deserializeStudentList("studentList.ser");
        if(saveStudentArrayStudent){
            serializeStudentList(loadedStudentList, "data.ser");
        }else{
            System.out.println("Save failed!");
        }
        return loadedStudentList;
    }

    private static ArrayList<Student> deserializeStudentList(String fileName) {
        ArrayList<Student> studentList = new ArrayList<>();
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(fileName))) {
            studentList = (ArrayList<Student>) ois.readObject();
            System.out.println("Danh sach sinh vien doc tu " + fileName);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return studentList;
    }
    private static void serializeStudentList(ArrayList<Student> studentList, String fileName) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(fileName))) {
            oos.writeObject(studentList);
            System.out.println("Ghi thanh cong danh sach sinh vien vao " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private static ArrayList<Student> concatenateLists(ArrayList<Student> list1, ArrayList<Student> list2) {
        ArrayList<Student> result = new ArrayList<>(list1);
        result.addAll(list2);

        return result;
    }
    public void updateStudentById(Student updatedStudent, ArrayList<Student> studentList) {
        int updatedStudentID = updatedStudent.getSid();

        // Tìm sinh viên có ID cần cập nhật
        for (Student student : studentList) {
            if (student.getSid() == updatedStudentID) {
                // Cập nhật thông tin sinh viên
                student.setLastName(updatedStudent.getLastName());
                student.setFirstName(updatedStudent.getFirstName());
                student.setMajor(updatedStudent.getMajor());
                student.setGpa(updatedStudent.getGpa());
                return;
            }
        }
    }
}

