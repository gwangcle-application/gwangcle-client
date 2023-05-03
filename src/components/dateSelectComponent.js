import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';

const today = new Date();

function DateSelectPage({ onDateChange }) {
  const [show, setShow] = useState(false);
  const dayInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [date, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: '',
    time: '',
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
    
    const defaultOptions = [
        { value: date.month, label: date.month }
    ];

    let dayOptions = [];
    const numberOfDays = 7;
    for (let i = 1; i <= numberOfDays; i++) {
        dayOptions.push({ value: today.getDate() + i, label: today.getDate() + i });
    }

    let timeOptions = [];
    const numberOfTimes = 13;
    for (let i = 1; i <= numberOfTimes; i++) {
        timeOptions.push({ value: 8+i, label: (8+i) + '시 00분' });
    }

    const handleSubmit = () => {
        onDateChange(date);
        handleClose();
      };
    

    const onClearSelect = () => {
        if (dayInputRef.current) {
        	dayInputRef.current.clearValue();
        }
        if(timeInputRef.current) {
            timeInputRef.current.clearValue();
        }
    }

    return (
        <div>
          <Button className="btn" variant="outline-primary" onClick={handleShow}>
            날짜 선택
          </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header>
                    <Modal.Title>스터디 모집날짜 선택</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Select
                    defaultValue={defaultOptions[0]}
                    isDisabled={true}
                />
                <Select
                    value={selectedDay}
                onChange={(day) => {
                  setSelectedDay(day);
                  if (day) {
                    setDate((prevState) => ({ ...prevState, day: day.value }));
                  } else {
                    setDate((prevState) => ({ ...prevState, day: '' }));
                  }
                }}
                options={dayOptions}
                placeholder="스터디 모집의 시작날을 선택해주세요."
              />
              <Select
                value={selectedTime}
                onChange={(time) => {
                  setSelectedTime(time);
                  if (time) {
                    setDate((prevState) => ({ ...prevState, time: time.value }));
                  } else {
                    setDate((prevState) => ({ ...prevState, time: '' }));
                  }
                }}
                options={timeOptions}
                placeholder="스터디 모집의 시작시간을 선택해주세요."
              />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleSubmit()}>
                            제출
                    </Button>
                    <Button onClick={() => onClearSelect()}>
                            초기화
                    </Button>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DateSelectPage;