import { useState } from 'react';
import { FaCar, FaTruck } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import UI components
import { Button } from './ui/button.jsx';
import { Card, CardContent } from './ui/card.jsx';
import { Checkbox } from './ui/checkbox.jsx';
import "./Booking.css"; // Ensure correct path


export default function BookingPage() {
  const [vehicleType, setVehicleType] = useState('car');
  const [sameReturnLocation, setSameReturnLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState('');
  const [isNegotiatedRate, setIsNegotiatedRate] = useState(false);

  const handleSearch = () => {
    console.log({
      vehicleType,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      isNegotiatedRate,
    });
  };

  return (
    <div className="booking-container">
      <Card className="booking-card">
        <CardContent>
          <h2 className="booking-title">What type of vehicle?</h2>

          <div className="vehicle-selection">
            <Button
              className={vehicleType === 'car' ? 'selected' : ''}
              onClick={() => setVehicleType('car')}
            >
              <FaCar className="icon" /> Cars
            </Button>
            <Button
              className={vehicleType === 'truck' ? 'selected' : ''}
              onClick={() => setVehicleType('truck')}
            >
              <FaTruck className="icon" /> Vans & Trucks
            </Button>
          </div>

          <label className="checkbox-label">
            <Checkbox
              checked={sameReturnLocation}
              onCheckedChange={setSameReturnLocation}
            />
            <span>Same return location</span>
          </label>

          <input
            type="text"
            placeholder="Pickup and return location"
            className="input-box"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />

          {!sameReturnLocation && (
            <input
              type="text"
              placeholder="Return Location"
              className="input-box"
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
            />
          )}

          <div className="date-time-section">
            <div>
              <label className="input-label">Pick up date</label>
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                className="input-box"
                placeholderText="Select pickup date"
              />
            </div>
            <div>
              <label className="input-label">Pick up time</label>
              <input
                type="time"
                className="input-box"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Return date</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="input-box"
                placeholderText="Select return date"
              />
            </div>
            <div>
              <label className="input-label">Return time</label>
              <input
                type="time"
                className="input-box"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
              />
            </div>
          </div>

          <div className="additional-options">
            <span>I am <strong>26+</strong></span>
            <span>I live in <strong>India</strong></span>
            <label className="checkbox-label">
              <Checkbox
                checked={isNegotiatedRate}
                onCheckedChange={setIsNegotiatedRate}
              />
              <span>I have a <strong>negotiated rate</strong></span>
            </label>
          </div>

          <Button className="search-button" onClick={handleSearch}>
            Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
