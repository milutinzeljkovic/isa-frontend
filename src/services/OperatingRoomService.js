import Service from './Service';

const resource = '/operating-room';

class OperatingRoomService extends Service{

    newOpRoom(operatingRoom) {
        return this.getApiClient().post(`${resource}/add`, operatingRoom);
    }

    getOpRooms(){
        return this.getApiClient().get(`${resource}/get`);
    }

    updateOperatingRoom(data){
        return this.getApiClient().put(`${resource}/update/${data.id}`, data);
    }

    deleteOperatingRoom(id){
        return this.getApiClient().delete(`${resource}/delete/${id}`);
    }

    seeIfBookedOpRoom(id){
        return this.getApiClient().get(`${resource}/used/${id}`);
    }

    searchOperatingRooms(data){
        return this.getApiClient().get(`${resource}?name=${data.name}&number=${data.number}&date=${data.date}`);
    }

    getAppointmentsOpRoom(id){
        return this.getApiClient().get(`${resource}/availability/${id}`);
    }

    getOperationsOpRoom(id){
        return this.getApiClient().get(`${resource}/availabilityOp/${id}`);
    }

    getFirstFreeDate(id){
        return this.getApiClient().get(`${resource}/recommendation/${id}`);
    }
}

export default OperatingRoomService;