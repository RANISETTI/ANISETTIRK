import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

export default function SearchableDropdown({
  items = [], label, selectedValue, onChange, disabled,
}) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex flex-row justify-content-between align-items-center"
    >
      {children}
      &#x25bc;
    </div>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({
      children, style, className, 'aria-labelledby': labeledBy,
    }, ref) => {
      const [value, setValue] = useState('');
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) => !value || child.props.children.props.children.toLowerCase().includes(value),
            )}
          </ul>
        </div>
      );
    },
  );

  const renderDropdownPlaceHolder = () => {
    if (selectedValue) {
      const address = items.filter((item) => item.id === selectedValue);
      return (
        <div
          className="bg-light cursor-pointer rounded address-container max-wid-300"
        >
          <p>{`${address[0].address_line_1}, ${address[0].address_line_2}`}</p>
          <p>{`${address[0].city} - ${address[0].pincode},`}</p>
          <p>{address[0].state_name}</p>
          <p>{address[0].gst_number}</p>
        </div>
      );
    }
    return label;
  };

  return (
    <Dropdown className="mx-3 p-1 rounded bg-light drop-width">
      {!disabled ? (
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <div className="address-container border-btm mx-5 my-2">
            {renderDropdownPlaceHolder()}
            </div>
        </Dropdown.Toggle>
      ) : <div className="address-container border-btm mx-5 my-2">Please Select a Department</div>}
      <Dropdown.Menu as={CustomMenu}>
        {/* <Dropdown.Item onClick={() => onChange('')}>Select Address</Dropdown.Item> */}
        {items.map((item) => (
          <Dropdown.Item key={item.id} onClick={() => onChange(item.id)} eventKey={item.id}>
            <div className="address-container border-btm">
              {`
                ${item.address_line_1}, ${item.address_line_2},
                ${item.city} - ${item.pincode},
                ${item.state_name},
                ${item.gst_number}.
              `}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
