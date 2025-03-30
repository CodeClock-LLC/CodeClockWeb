// src/config/boxConfig.js
export const boxNames = [
    'PulseCheck',
    'Rhythms',
    'Meds',
    'Tasks',
    'Roles',
    'Meds2',
    'Views',
    'EndStates'
];

// Generate placeholder labels for 5 buttons per box
export const PulseCheckBoxLabels = [
    'PulseCheck-1',
    'PulseCheck-2',
    'PulseCheck-3',
    'PulseCheck-4',
    'PulseCheck-5'
];
export const RhythmsBoxLabels = [
    'Rhythms-1',
    'Rhythms-2',
    'Rhythms-3',
    'Rhythms-4',
    'Rhythms-5'
];
export const MedsBoxLabels = [
    'Meds-1',
    'Meds-2',
    'Meds-3',
    'Meds-4',
    'Meds-5',
    'Meds-6',
    'Meds-7',
    'Meds-8',
    'Meds-9',
    'Meds-10'
];
export const TasksBoxLabels = [
    'Tasks-1',
    'Tasks-2',
    'Tasks-3',
    'Tasks-4',
    'Tasks-5'
];
export const RolesBoxLabels = [
    'Roles-1',
    'Roles-2',
    'Roles-3',
    'Roles-4',
    'Roles-5'
];
// export const Meds2BoxLabels = [
//     'Meds2-1',
//     'Meds2-2',
//     'Meds2-3',
//     'Meds2-4',
//     'Meds2-5'
// ];
export const ViewsBoxLabels = [
    'Views-1',
    'Views-2',
    'Views-3',
    'Views-4',
    'Views-5'
];
export const EndStatesBoxLabels = [
    'EndStates-1',
    'EndStates-2',
    'EndStates-3',
    'EndStates-4',
    'EndStates-5'
];

// Final boxbuttonLabels container
export const boxButtonLabels = {
    'PulseCheck': PulseCheckBoxLabels,
    'Rhythms': RhythmsBoxLabels,
    'Meds': MedsBoxLabels,
    'Tasks': TasksBoxLabels,
    'Roles': RolesBoxLabels,
    // 'Meds2': Meds2BoxLabels,
    'Views': ViewsBoxLabels,
    'EndStates': EndStatesBoxLabels,
};

// Example: boxButtonLabels['PulseCheck'] will be ['PulseCheck-1', ..., 'PulseCheck-5']

// Helper function if needed later
export const getAllButtonLabels = () => Object.values(boxButtonLabels).flat();