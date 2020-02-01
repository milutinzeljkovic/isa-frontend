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
}

export default OperatingRoomService;