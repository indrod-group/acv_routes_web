/**
 * Represents the different types of tasks that can be performed on a vehicle.
 */
export type Task = "I" | "R" | "A" | "T" | "L" | "C" | "CK" | "TS" | "SV";

/**
 * Maps each task to its description.
 */
export type TaskDetails = {
    [K in Task]: string;
};

/**
 * Provides the description for each task.
 */
export const TASK_DETAILS: TaskDetails = {
    "I": "Inspect and correct or replace if necessary.",
    "A": "Adjust.",
    "R": "Replace or change.",
    "T": "Tighten to specified torque.",
    "L": "Lubricate and/or grease.",
    "C": "Clean.",
    "CK": "Check.",
    "TS": "Test.",
    "SV": "Service."
};

/**
 * Represents the frequency at which a task should be performed.
 */
export type Frequency = `${number}${"h" | "kn" | "dam" | "mi" | "-"},${number}${"h" | "kn" | "dam" | "mi" | "-"},${number}${"h" | "d" | "w" | "m" | "y" | "-"}`;

/**
 * Represents a maintenance manual for a vehicle.
 */
export type Manual = {
    muid: string;  // UUID of the maintenance manual
    manual_tasks: ManualTask[];  // The tasks in the manual
    start_date: Date;  // The start date of the maintenance cycle
    advance_alerts: string;  // Anticipate maintenance in advance
    minimum_frequency: string;  // The minimum mileage/time at which operations should be performed
    end_of_cycle: string;  // The mileage/time limit that marks the end of each maintenance cycle
    manual_file: null;  // The original maintenance manual document
    vehicle_type: number;  // The vehicle type to which the maintenance manual belongs
}

/**
 * Represents a maintenance operation.
 */
export type ManualTask = {
    id: number;  // The ID of the task
    system: string;  // The vehicle's system
    subsystem: string;  // Subsystem of the vehicle's main system
    task: Task;  // The task to be performed in the operation
    description: string;  // Description of the task to be performed
    frequency: string;  // The mileage at which the operation should be performed
    help_me: string;  // Additional information to help perform the maintenance task
    manual: string;  // Maintenance manual to which this system belongs
}
