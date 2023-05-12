import {
  Box,
  Button,
  VStack,
  Input,
  SkeletonText,
  SimpleGrid,
  Text,
  HStack,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { BOOK_TRIP } from "../../graphqlOperation/mutation";
import { useIsMobile } from "../../utilities/isMobile";
import { locations } from "./constants";

const center = { lat: 48.8584, lng: 2.2945 };

function BookTrip() {
  const [bookTrip] = useMutation(BOOK_TRIP);
  const toast = useToast();
  const { isMobile } = useIsMobile();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBoVQ3bKj_EczoAexCIEwqc85dNdvKKuX8",
    libraries: ["places"],
  });

  const [map, setMap] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (origin === "" || destination === "") {
      return;
    }
    const randomIndex = Math.floor(Math.random() * 5);
    const newDistance = Math.round([116, 76, 132, 88, 146][randomIndex]);
    setDistance(newDistance);
    setDuration(Math.round((newDistance * 80) / 100));
    // const directionsService = new google.maps.DirectionsService();
    // const results = await directionsService.route({
    //   origin,
    //   destination,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // });
    // setDirectionsResponse(results || null);
    // setDistance(results?.routes?.[0]?.legs?.[0]?.distance?.value || 0);
    // setDuration(results?.routes?.[0]?.legs?.[0]?.duration?.value || 0);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance(0);
    setDuration(0);
    setOrigin("");
    setDestination("");
  }

  async function bookMeeting() {
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + duration);
    endTime = new Date(endTime);

    const payload = {
      origin,
      destination,
      fare: distance * 10 + duration * 2,
      riderId: "rid_2345",
      // status:"IN_PROGRESS",
      // startTime: new Date(),
      // scheduledEndTime: endTime,
    };
    await bookTrip({ variables: { bookingData: payload } })
      .then(() => {
        toast({
          title: "Trip Booked Successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        clearRoute();
      })
      .catch((error) => {
        toast({
          title: error.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  return (
    <Box w="100%" minH="100%" px="8" py="4">
      <SimpleGrid columns={isMobile ? 1 : 2}>
        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          zIndex="1"
        >
          <VStack
            w="100%"
            alignItems="flex-start"
            spacing={4}
            justifyContent="space-between"
          >
            <Box flexGrow={1} w="100%">
              {/* <Autocomplete> */}
              <Select
                variant="customSelect"
                placeholder="Select origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                {locations
                  .filter((item) => item?.place !== destination)
                  .map((location) => (
                    <option value={location.place}>{location.place}</option>
                  ))}
              </Select>
              {/* </Autocomplete> */}
            </Box>
            <Box flexGrow={1} w="100%">
              {/* <Autocomplete> */}
              <Select
                variant="customSelect"
                placeholder="Select Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {locations
                  .filter((item) => item?.place !== origin)
                  .map((location) => (
                    <option value={location.place}>{location.place}</option>
                  ))}
              </Select>
              {/* </Autocomplete> */}
            </Box>

            <HStack justifyContent="space-between" w="100%">
              <Button colorScheme="teal" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <Button onClick={clearRoute}>Clear</Button>
            </HStack>
          </VStack>
          {distance && duration ? (
            <VStack w="100%" alignItems="flex-start" spacing={4} mt={4}>
              <Text>Distance: {distance} Km </Text>
              <Text>Duration: {duration} mins </Text>
              <Text>Fare: ₹{distance * 10 + duration * 2} </Text>
              <Button onClick={bookMeeting} colorScheme="teal">
                Book Meeting
              </Button>
            </VStack>
          ) : null}
        </Box>
        <Box
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          zIndex="1"
          overflow="hidden"
          minH="300px"
        >
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map: any) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default BookTrip;
