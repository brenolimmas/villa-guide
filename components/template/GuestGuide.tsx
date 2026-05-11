import type { PropertyPageData } from '@/types/property';
import { HeroSection } from '@/components/sections/HeroSection';
import { RulesSection } from '@/components/sections/RulesSection';
import { CommerceSection } from '@/components/sections/CommerceSection';
import { RoutesSection } from '@/components/sections/RoutesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TabsController } from '@/components/interactive/TabsController';
import { AvailPanel } from '@/components/interactive/AvailPanel';
import { WifiPanel } from '@/components/interactive/WifiPanel';
import { ConciergeButton } from '@/components/interactive/ConciergeButton';

interface Props {
  data: PropertyPageData;
}

export function GuestGuide({ data }: Props) {
  const { property, reservation, rules, faqs, villa_slides, commerce, routes, services, emergency_contacts } = data;

  return (
    <>
      <div className="app" id="js-app">
        <HeroSection property={property} reservation={reservation} />

        <TabsController>
          <RulesSection
            property={property}
            rules={rules}
            faqs={faqs}
            villaSlides={villa_slides}
            emergencyContacts={emergency_contacts}
          />
          <CommerceSection commerce={commerce} />
          <RoutesSection routes={routes} />
          <ServicesSection services={services} whatsapp={property.whatsapp} />
        </TabsController>
      </div>

      <AvailPanel whatsapp={property.whatsapp} />
      <WifiPanel wifiName={property.wifi_name} wifiPass={property.wifi_pass} />
      <ConciergeButton propertyName={property.name} guestName={reservation?.guest_name} />
    </>
  );
}
