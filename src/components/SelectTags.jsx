import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
const DivSelect = styled.div`
  margin: 10px;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

export default function SelectTags({ setTags }) {
  const [selectedOptions, setSelectedOptions] = useState();

  const optionList = [
    { value: "study", label: "Study" },
    { value: "music", label: "Music" },
    { value: "torah", label: "Torah" },
    { value: "advertising", label: "Advertising" },
    { value: "instructions", label: "Instructions" },
    { value: "nature", label: "Nature" },
    { value: "recipe", label: "Recipe" },
    { value: "company", label: "Company" },
  ];

  const handleSelect = (data) => {
    setSelectedOptions(data);
    setTags(data.map((item) => item.value));
  };
  const styles = {
    option: (provided) => ({
      ...provided,
      background: `${({ theme }) => theme.bgLighter}`,
      color: `${({ theme }) => theme.text}`,
    }),
    singleValue: (provided) => ({
      ...provided,
      opacity: 1,
      transition: "opacity 300ms",
      background: "red",
    }),
  };

  return (
    <DivSelect>
      <Select
        options={optionList}
        placeholder="Select tags"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
        styles={styles}
      />
    </DivSelect>
  );
}
