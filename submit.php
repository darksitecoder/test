<?php
// Allow CORS for testing
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Add timestamp to the data
$data['submitted_at'] = date('Y-m-d H:i:s');

// Display the data in a formatted way
?>
<!DOCTYPE html>
<html>
<head>
    <title>Form Submission Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .data-section { 
            background: #f5f5f5; 
            padding: 15px; 
            border-radius: 5px;
            margin: 10px 0;
        }
        .label { font-weight: bold; color: #666; }
        pre { background: #fff; padding: 10px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Form Submission Data</h1>
    
    <div class="data-section">
        <h2>Team Information</h2>
        <p><span class="label">Team Size:</span> <?php echo htmlspecialchars($data['teamSize']); ?></p>
    </div>

    <div class="data-section">
        <h2>Meal Preferences</h2>
        <p><span class="label">Meal Type:</span> <?php echo htmlspecialchars($data['mealType']); ?></p>
        <?php if (!empty($data['customMealName'])): ?>
            <p><span class="label">Custom Meal Name:</span> <?php echo htmlspecialchars($data['customMealName']); ?></p>
        <?php endif; ?>
        <p><span class="label">Delivery Time:</span> <?php echo htmlspecialchars($data['deliveryTime']); ?></p>
    </div>

    <div class="data-section">
        <h2>Schedule</h2>
        <p><span class="label">Frequency:</span> <?php echo htmlspecialchars($data['frequency']); ?></p>
        <?php if (!empty($data['days'])): ?>
            <p><span class="label">Days:</span> <?php echo htmlspecialchars(implode(', ', $data['days'])); ?></p>
        <?php endif; ?>
        <?php if (!empty($data['selectedDates'])): ?>
            <p><span class="label">Selected Dates:</span> <?php echo htmlspecialchars(implode(', ', $data['selectedDates'])); ?></p>
        <?php endif; ?>
    </div>

    <div class="data-section">
        <h2>Budget</h2>
        <p><span class="label">Allowance Type:</span> <?php echo htmlspecialchars($data['allowanceType']); ?></p>
        <p><span class="label">Amount:</span> $<?php echo htmlspecialchars($data['allowanceAmount']); ?></p>
        <p><span class="label">Credit Card Enabled:</span> <?php echo $data['creditCard'] ? 'Yes' : 'No'; ?></p>
    </div>

    <div class="data-section">
        <h2>Dietary Preferences</h2>
        <?php if (!empty($data['dietary'])): ?>
            <p><?php echo htmlspecialchars(implode(', ', $data['dietary'])); ?></p>
        <?php else: ?>
            <p>No dietary preferences specified</p>
        <?php endif; ?>
    </div>

    <div class="data-section">
        <h2>User Details</h2>
        <?php foreach ($data['userDetails'] as $key => $value): ?>
            <p><span class="label"><?php echo ucwords(str_replace('_', ' ', $key)); ?>:</span> 
               <?php echo htmlspecialchars($value); ?></p>
        <?php endforeach; ?>
    </div>

<div class="data-section">
        <h2>Raw Data (Debug)</h2>
        <pre><?php print_r($data); ?></pre>
    </div>
</body>
</html>
?>