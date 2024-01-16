import React, { useState } from "react";
import {
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DepartmentData from "./data.json";

interface Department {
  department: string;
  sub_departments: string[];
}

const DepartmentList: React.FC = () => {
  const data: Department[] = DepartmentData;

  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

  const handleSubDepartmentToggle =
    (department: string, subDepartment: string) => () => {
      setSelected((prevSelected) => {
        const selectedSubDepartments = prevSelected[department] || [];
        const newSelectedSubDepartments = selectedSubDepartments.includes(
          subDepartment
        )
          ? selectedSubDepartments.filter((subDep) => subDep !== subDepartment)
          : [...selectedSubDepartments, subDepartment];

        return {
          ...prevSelected,
          [department]: newSelectedSubDepartments,
        };
      });
    };

  const handleDepartmentToggle = (department: string) => () => {
    setSelected((prevSelected) => {
      const isSelected =
        prevSelected[department]?.length ===
        data.find((item) => item.department === department)?.sub_departments
          .length;
      return {
        ...prevSelected,
        [department]: isSelected
          ? []
          : data.find((item) => item.department === department)
              ?.sub_departments || [],
      };
    });
  };

  const handleExpand = (value: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(value)
        ? prevExpanded.filter((dep) => dep !== value)
        : [...prevExpanded, value]
    );
  };

  const isExpanded = (value: string) => expanded.includes(value);

  const isSelected = (department: string, subDepartment: string) => {
    const selectedSubDepartments = selected[department] || [];
    const departmentData = data.find((item) => item.department === department);
    return (
      departmentData?.sub_departments.length ===
        selectedSubDepartments.length ||
      selectedSubDepartments.includes(subDepartment)
    );
  };

  return (
    <>
    <h1>Department List</h1>
    <li>
      {data.map((item) => (
        <div key={item.department}>
              <div className="department-header">
            <li
              onClick={() => handleExpand(item.department)}
              style={{ cursor: "pointer" }}
            >
              {isExpanded(item.department) ? <ExpandLess /> : <ExpandMore />}
            </li>
                  <label className="checkbox" >
            <input type="checkbox" 
                checked={isSelected(item.department, "")}
                onClick={handleDepartmentToggle(item.department)}
              />
                      <h2>{item.department}</h2>
            </label>
          </div>
          <Collapse
            in={isExpanded(item.department)}
            timeout="auto"
            unmountOnExit
          >
            <ul className="sublist">
              {item.sub_departments.map((subDepartment) => (
                <li
                  key={subDepartment}
                  onClick={handleSubDepartmentToggle(
                    item.department,
                    subDepartment
                  )} // Use the new handler here
                  style={{ paddingLeft: "32px", cursor: "pointer" }}
                >
                      <label className="checkbox">
                          <input type="checkbox"
                              checked={isSelected(item.department, subDepartment)}
                          />
                          <h3>{subDepartment}</h3>
                      </label>
                </li>
              ))}
            </ul>
          </Collapse>
        </div>
      ))}
    </li>
      </>
  );
};

export default DepartmentList;