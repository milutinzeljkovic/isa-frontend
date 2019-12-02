import Service from './Service';

const resource = '/locations';

class LocationService extends Service{

    searchLocation(location){
        return this.getApiClient().get(`${resource}?location=${location}`);
    }
}


export default LocationService;