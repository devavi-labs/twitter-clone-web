import { ROUTES_KEY } from "./constants";

export class PathLocationManager {
  private pastLocations: Location[] = [];
  private readonly key = ROUTES_KEY;

  constructor() {
    const jsonFromSessionStorage = sessionStorage.getItem(this.key);
    this.pastLocations = jsonFromSessionStorage
      ? (JSON.parse(jsonFromSessionStorage) as Location[])
      : [];
  }

  public register(location: Location) {
    this.pastLocations.push(location);
    this.dumpToSessionStorage();
  }

  public get lastLocation() {
    return this.pastLocations[this.pastLocations.length - 2];
  }

  public get locations() {
    return this.pastLocations;
  }

  public get length() {
    return this.pastLocations.length;
  }

  public get isPreviousLocationWithinApp(): boolean {
    return this.pastLocations.length > 1;
  }

  public setLocation(index: number, location: Location) {
    this.pastLocations[index] = location;
    this.dumpToSessionStorage();
  }

  public getLocation(index: number) {
    return this.pastLocations[index];
  }

  public setLocations(locations: Location[]) {
    this.pastLocations = locations;
    this.dumpToSessionStorage();
  }

  private dumpToSessionStorage() {
    sessionStorage.setItem(this.key, JSON.stringify(this.pastLocations));
  }
}
