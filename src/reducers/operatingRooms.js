export default (state = null, action) => {
    switch (action.type) {
        case 'GETALLOPROOMS':
            return { ...state, operatingRooms: action.payload };
        case 'DELETE_OPERATING_ROOM':
            return state.operatingRooms.filter(val => val.id !== action.payload);
        case 'SET-OPERATING-ROOMS':
            return { ...state, operatingRooms: action.payload };
        case 'OPERATING-ROOM-CALENDAR':
            return { ...state, calendarOpRoom: action.payload };
        case 'SET-OPERATING-ROOM-APPOINTMENTS':
            return { ...state, operatingRoomAppointments: action.payload };
        case 'SET-OPERATING-ROOM-OPERATIONS':
            return { ...state, operatingRoomOperations: action.payload };
        case 'SET-FIRST-FREE-DATE':
            return { ...state, firstFreeDate: action.payload };
        case 'RESERVE_ROOM':
            return { ...state, appointment: action.payload }
        case 'RESERVE_ROOM_FOR_OPERATION':
            return { ...state, operation: action.payload }
        case 'ROOM_RESERVED_FOR_OPERATION':
            return { ...state, operationRoomReserved: action.payload }
        default: return state;
    }

}