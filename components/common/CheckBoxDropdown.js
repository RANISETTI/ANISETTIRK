import React from 'react';
import './styles.css';

import {
  Button, ButtonGroup, Dropdown, Form,
} from 'react-bootstrap';





export function CheckboxDropdown({ items }) {

  const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
      onSelectAll,
      onSelectNone,
    },
    ref,
  ) => (
    <div
      ref={ref}
      style={style}
      className={`${className} CheckboxMenu`}
      aria-labelledby={labeledBy}
    >
      <div
        className="d-flex flex-column"
        style={{ maxHeight: 'calc(100vh)', overflow: 'none' }}
      >
        <ul
          className="list-unstyled flex-shrink mb-0"
          style={{ overflow: 'auto' }}
        >
          {children}
        </ul>
      </div>
    </div>
  ),
);

  const handleChecked = (key, event) => {
    items.find((i) => i.id === key).checked = event.target.checked;
  };

  const CheckDropdownItem = React.forwardRef(
  ({
    children, id, checked, onChange,
  }, ref) => (
    <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
      <Form.Check
        type="checkbox"
        label={children}
        checked={checked}
        onChange={onChange && onChange.bind(onChange, id)}
      />
    </Form.Group>
  ),
);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Properties
      </Dropdown.Toggle>
      <Dropdown.Menu
        as={CheckboxMenu}
        onSelectAll={handleSelectAll}
        onSelectNone={handleSelectNone}
      >
        {items.map((i) => (
          <div>
            <Dropdown.Item
              key={i.id}
              as={CheckDropdownItem}
              id={i.id}
              checked={i.checked}
              onChange={handleChecked}
            >
              {i.label}
            </Dropdown.Item>
            {
              i.children && i.children.map((c) => (
                <Dropdown.Item
                  key={c.id}
                  as={CheckDropdownItem}
                  id={c.id}
                  checked={c.checked}
                  onChange={handleChecked}
                >
                  {c.label}
                </Dropdown.Item>
              ))
            }
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
