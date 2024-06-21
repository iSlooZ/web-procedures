'use client'
import { useEffect, useState } from "react";

interface Params {
  id: number;
}

interface Employee {
  id_employee: number;
  name_employee: string;
  email_employee: string;
  phone_employee: string;
  id_position: number;
}

interface Section {
  id_section: number;
  name_section: string;
  logo_section: string;
  color_section: string;
  id_company: number;
}

interface Position{
  id_position: number;
  position: string;
}

interface ApiResponse {
  employees: Employee[];
  section: Section;
  position: Position;
}

export default function EmployeesBySectionId({ params }: { params: Params }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeesAndSection = async () => {
      try {
        const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/section-with-employees/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ApiResponse = await response.json();
        setEmployees(data.employees);
        setSection(data.section);
        setPosition(data.position);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmployeesAndSection();
  }, [params.id]);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee === selectedEmployee ? null : employee);
  };

  console.log(employees)

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {section && (
        <div className="w-[40%]">
          <span>Mi cuenta / Colaboradores / {section.name_section}</span>
        </div>
      )}
      <div>
        {employees.length > 0 ? (
          <ul>
            {employees.map(employee => (
              <li className="min-w-[500px] w-[800px] flex flex-col justify-center items-center gap-2 my-8" key={employee.id_employee} onClick={() => handleEmployeeClick(employee)}>
                <h3 className="primary-color text-white rounded-xl px-4 py-2 w-full">{employee.name_employee}</h3>
                {selectedEmployee === employee && (
                  <div className="w-full flex flex-col gap-2 justify-center items-center">
                    <p className="border px-4 py-2 rounded-xl border-primary-color w-full">{employee.email_employee}</p>
                    <p className="border px-4 py-2 rounded-xl border-primary-color w-full">{employee.phone_employee}</p>
                    <p className="border px-4 py-2 rounded-xl border-primary-color w-full">{position?.position}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no hay colaboradores</p>
        )}
      </div>
    </section>
  );
}
