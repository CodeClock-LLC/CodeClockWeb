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
    'ASYSTOLE',
    'PEA',
    'VF',
    'VT',
    'OTHER'
];
export const MedsBoxLabels = [
    'AMIO',
    'EPI',
    'LIDO',
    'BICARB',
    'CALCIUM',
    'VASO',
    'NARCAN',
    'MAG',
    'NOREPI',
    'D50',
    'FLUIDS',
    'MISC'
];
export const TasksBoxLabels = [
    'PADS',
    'BACKBOARD',
    'LABS',
    'IV/IO',
    'INTUBATE',
    'ULTRASOUND',
    'EtCO2',
    'CALL FAMILY'
];
export const RolesBoxLabels = [
    'LEADER',
    'PULSE CHECK',
    'DEFIB',
    'MEDS',
    'HOUSE SUP',
    'AIRWAY',
    'PHARAMACY',
    'RUNNER'
];
// export const Meds2BoxLabels = [
//     'Meds2-1',
//     'Meds2-2',
//     'Meds2-3',
//     'Meds2-4',
//     'Meds2-5'
// ];
export const ViewsBoxLabels = [
    'VIEW',
    'UNDO'
];
export const EndStatesBoxLabels = [
    'PAUSE/RESTART',
    'END',
    'ROSC',
    'ECMO',
    'EXPIRED'
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