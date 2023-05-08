import {
  Box,
  Button,
  VStack,
  Input,
  SkeletonText,
  SimpleGrid,
  Text,
  HStack,
} from "@chakra-ui/react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useIsMobile } from "../../utilities/isMobile";

const center = { lat: 48.8584, lng: 2.2945 };

function BookTrip() {
  const { isMobile } = useIsMobile();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBoVQ3bKj_EczoAexCIEwqc85dNdvKKuX8",
    libraries: ["places"],
  });

  const [map, setMap] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef<HTMLInputElement>(null);
  const destiantionRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (
      originRef?.current?.value === "" ||
      destiantionRef?.current?.value === ""
    ) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef?.current?.value || "",
      destination: destiantionRef?.current?.value || "",
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results || null);
    setDistance(results?.routes?.[0]?.legs?.[0]?.distance?.text || "");
    setDuration(results?.routes?.[0]?.legs?.[0]?.duration?.text || "");
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef?.current) {
      originRef.current.value = "";
    }
    if (destiantionRef?.current) {
      destiantionRef.current.value = "";
    }
  }

  return (
    <Box w="100%" minH="100%" bgColor="grey" px="8" py="4">
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
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1} w="100%">
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <HStack justifyContent="space-between" w="100%">
              <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <Button onClick={clearRoute}>Clear</Button>
            </HStack>
          </VStack>
          <VStack w="100%" alignItems="flex-start" spacing={4} mt={4}>
            {distance && <Text>Distance: {distance} </Text>}
            {duration && <Text>Duration: {duration} </Text>}
          </VStack>
        </Box>
        <Box
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          zIndex="1"
          overflow="hidden"
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
