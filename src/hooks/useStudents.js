import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY } from '@/utils/constants'

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeToStorage(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}

export function useStudents() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    setStudents(readFromStorage())
  }, [])

  const addStudent = useCallback((student) => {
    const newStudent = { id: Date.now(), ...student }
    const updated = [...readFromStorage(), newStudent]
    writeToStorage(updated)
    setStudents(updated)
    return newStudent
  }, [])

  const getCount = useCallback(() => {
    return readFromStorage().length
  }, [])

  return { students, addStudent, count: students.length, getCount }
}
