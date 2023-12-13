package com.example.backend;

public interface Manageable {

    public void addStudent(Student student);

    public boolean deleteStudentById(int sid);

    public void updateStudentById(int sid);

    public void printAllStudent();

    public void findStudentByMajor(String major);

    public void findStudentById(int sid);

    public void sortById();

    public void sortByGpa();

    public void sortByFirstName();

    public void loadFromFile();

    public void saveToFile();
}
