// This file provides functionality for a clock interface that allows users to select their own time. 
// It includes event listeners and methods to display and manage the time selection.

document.addEventListener('DOMContentLoaded', function() {
    const timePickerButton = document.getElementById('selectTimeBtn');
    const timePickerModal = document.getElementById('timePickerModal');
    const timeInput = document.getElementById('customTimeInput');
    const confirmTimeButton = document.getElementById('confirmTimeBtn');

    // Open the time picker modal
    timePickerButton.addEventListener('click', function() {
        timePickerModal.classList.remove('hidden');
    });

    // Close the time picker modal
    timePickerModal.addEventListener('click', function(event) {
        if (event.target === timePickerModal) {
            timePickerModal.classList.add('hidden');
        }
    });

    // Confirm the selected time
    confirmTimeButton.addEventListener('click', function() {
        const selectedTime = timeInput.value;
        if (selectedTime) {
            document.getElementById('selectedTimeDisplay').textContent = `Selected Time: ${selectedTime}`;
            timePickerModal.classList.add('hidden');
        } else {
            alert('Please select a time.');
        }
    });
});