let currentStep = 1;
let formData = {
    teamSize: '',
    mealType: '',
    deliveryTime: '',
    frequency: '',
    days: [],
    startDate: '',
    allowanceType: '',
    allowanceAmount: 20,
    creditCard: true,
    dietary: [],
    additionalRestrictions: '',
    mealName: '',
    customTime: ''
};

const mealCards = document.querySelectorAll('.meal-card');
const timeOptionsContainer = document.querySelector('.time-options');
const customTimeInput = document.createElement('input');
customTimeInput.type = 'time';
customTimeInput.classList.add('time-input', 'hidden');
timeOptionsContainer.appendChild(customTimeInput);

mealCards.forEach(card => {
    card.addEventListener('click', function() {
        mealCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        formData.mealType = this.dataset.value;

        // Clear existing time options
        timeOptionsContainer.querySelectorAll('.time-btn').forEach(btn => btn.remove());

        // Update available timing options based on selected meal
        updateTimingOptions(formData.mealType);
    });
});

function updateTimingOptions(mealType) {
    const availableTimes = {
        breakfast: ['7:00 am', '8:00 am', '9:00 am'],
        lunch: ['12:00 pm', '1:00 pm', '2:00 pm'],
        dinner: ['6:00 pm', '7:00 pm', '8:00 pm'],
        other: ['Select Your Time']
    };

    availableTimes[mealType].forEach(time => {
        const timeBtn = document.createElement('button');
        timeBtn.classList.add('time-btn');
        timeBtn.textContent = time;
        timeBtn.dataset.value = time;

        timeBtn.addEventListener('click', function() {
            timeOptionsContainer.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            formData.deliveryTime = this.dataset.value;

            if (this.dataset.value === 'Select Your Time') {
                customTimeInput.classList.remove('hidden');
                customTimeInput.addEventListener('change', function() {
                    formData.customTime = this.value;
                });
            } else {
                customTimeInput.classList.add('hidden');
            }
        });

        timeOptionsContainer.appendChild(timeBtn);
    });
}

// Input for meal name
const mealNameInput = document.createElement('input');
mealNameInput.type = 'text';
mealNameInput.placeholder = 'Enter meal name';
mealNameInput.classList.add('text-input');
mealNameInput.addEventListener('input', function() {
    formData.mealName = this.value;
});
timeOptionsContainer.appendChild(mealNameInput);