import { HomeAppointmentPopup } from "@/components/home-appointment-popup";
import { HomePageContent } from "@/components/hospital-sections";
import {
  HomeFacilitiesAndDoctors,
  HomeGalleryAndFeedback,
  HomeLocation,
} from "@/components/home-extras";

export function HomePage() {
  return (
    <>
      <HomePageContent
        afterSpecialities={<HomeFacilitiesAndDoctors />}
        afterJourney={<HomeGalleryAndFeedback />}
        afterAppointment={<HomeLocation />}
      />
      <HomeAppointmentPopup />
    </>
  );
}
