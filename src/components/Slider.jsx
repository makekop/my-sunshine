import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes({ value, onChange }) {
  const handleChange = (_event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex justify-center items-center mt-2">
      <Box sx={{ width: 300 }}>
        <Slider
          value={value}
          onChange={handleChange}
          min={1}
          max={50}
          step={1}
          aria-label="Days"
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
}
