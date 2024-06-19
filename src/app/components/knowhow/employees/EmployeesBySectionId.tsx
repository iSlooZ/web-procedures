'use client'
import { useEffect, useState } from "react"

interface Params {
  id: number;
}

interface Employee {
  id_employee: number;
  name_employee: string;
  email_employee: string;
  password_employee: string;
  phone_employee: string;
  id_company: number;
  id_section: number;
  id_position: number;
}

export const EmployeesBySectionId = ({ params }: { params: Params }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/employees/by-section/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id_employee}>
            <p>Name: {employee.name_employee}</p>
            <p>Email: {employee.email_employee}</p>
            <p>Phone: {employee.phone_employee}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
