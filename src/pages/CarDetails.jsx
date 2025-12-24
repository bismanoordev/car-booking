import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";

const cars = [
  {
    id: 0,
    name: "ALTROZ",
    image:
      "https://media.zigcdn.com/media/model/2025/Jul/model-extimg-849810175_600x400.jpg",
    description:
      "he Altroz is a premium hatchback by Tata Motors, known for its stylish design and comfortable interior. It offers both petrol and diesel variants, making it versatile for different driving needs. The car is fuel-efficient, delivering around 17–19 km/l for petrol and 22–25 km/l for diesel. Safety is a priority, with features like dual airbags, ABS, and ISOFIX child seat anchors included. Overall, Altroz combines style, comfort, and efficiency in a compact package.In Pakistani rupees (approximate local market), Tata Altroz prices are around PKR 2.7 – 2.9 million (varies by version and taxes).",
  },
  {
    id: 1,
    name: "BREZZA",
    image:
      "https://www.suzukicar.com.bd/suzuki/public/uploads/images/products/1000-x-386_1672047889.png",
    description:
      "Maruti Suzuki Brezza is a popular compact SUV known for its stylish design, comfortable ride, and good fuel efficiency. It comes with a 1.5 L petrol engine and is available with manual and automatic transmissions. The Brezza also offers good mileage (around ~18–20 km/l) and a spacious interior with modern features like touchscreen infotainment, safety systems, and more. priced roughly between ₹8–16 lakh in India and around PKR 3.4–4.4 million in Pakistan for different variants.",
  },
  {
    id: 2,
    name: "CIAZ",
    image:
      "https://media.zigcdn.com/media/model/2018/Oct/side-view-962895684_600x400.jpg",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 3,
    name: "DUSTER",
    image:
      "https://www.topgear.com/sites/default/files/2023/01/Dacia%20Duster%20-%20Dynamic%20%281%29.jpg",
    description:
      "The Duster is a rugged compact SUV known for its strong build and capability on both city roads and rough terrain. It typically comes with a 1.6 L petrol engine, offers seating for five, and has a roomy cabin with decent ground clearance and everyday SUV features like ABS and power steering. Many buyers appreciate the Duster for its balance of performance, utility, and ease of maintenance, making it a practical choice for family use and adventures alike.in Pakistan its price is around PKR 5.3 – 5.9 million.",
  },
  {
    id: 4,
    name: "FIGO",
    image:
      "https://cmhford.co.za/wp-content/uploads/2015/06/figo-hatch-front-1-1.jpg",
    description:
      "The Ford Figo is a compact and practical hatchback that’s known for its easy handling, decent fuel efficiency, and everyday usability. It comes in both petrol and diesel engine options, usually with manual or automatic transmissions, and seats five people comfortably with basic features like power steering, air conditioning, airbags, and safety systems — making it a good choice for city driving and short trips.Other Figo variants generally range from about PKR 2.0 – 3.5 million depending on model year, condition, and trim.",
  },
  {
    id: 5,
    name: "GLE",
    image:
      "https://di-uploads-pod7.dealerinspire.com/mercedesbenzoftysonscorner/uploads/2020/01/Silver-2020-MB-GLE.png",
    description:
      "The Mercedes‑Benz GLE is a luxury midsize SUV known for its premium comfort, advanced technology, and strong performance. It offers a range of engine options—from efficient mild‑hybrid 4‑cylinder and powerful 6‑cylinder engines to high‑performance AMG variants—and comes with features like all‑wheel drive (4MATIC), a smooth 9‑speed automatic, and a refined interior with modern infotainment and safety systems. The GLE also provides spacious seating and a versatile cabin, making it a great choice for family use or comfortable long drives.",
  },
  {
    id: 6,
    name: "HECTOR",
    image:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/212881/hector-facelift-exterior-left-front-three-quarter.jpeg?isig=0&q=80",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 7,
    name: "THAR",
    image:
      "https://fcache1.pakwheels.com/original/4X/e/5/0/e50e4510209d3ad69845ffce85e4669981c241dc.jpeg",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 8,
    name: "JIMNY",
    image:
      "https://images.carexpert.com.au/resize/800/-/cms/v1/media/2024-08-2024-suzuki-jimny-xl-hero-16x9-1.jpg",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 9,
    name: "LAND ROVER",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover-Velar/12767/1758105499465/front-left-side-47.jpg",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 10,
    name: "TOYOTA",
    image:
      "https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/947/toyota-land-cruiser-rox-concept_100947499.jpg",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
  {
    id: 11,
    name: "SUZUKI",
    image:
      "https://i.guim.co.uk/img/media/34debcb4de9e60c2dec2c72496059e39c88b41fe/149_259_3345_2007/master/3345.jpg?width=465&dpr=1&s=none&crop=none",
    description:
      "The Maruti Suzuki Ciaz is a midsize sedan known for its comfortable ride, spacious interior, and good fuel efficiency. It comes with a 1.5 L petrol Smart Hybrid engine and offers both manual and automatic transmissions, along with features like a touchscreen infotainment system, rear AC vents, cruise control, and safety equipment such as dual airbags and ABS.Prices can vary based on condition (new vs used), model year, mileage, and dealer offers. Used Ciaz models in Pakistan also show lower market prices (around PKR 2.4 – 2.9 million) for older cars.",
  },
];

export default function CarDetails() {
  const { id } = useParams();
  const car = cars[id];

  return (
    <>
      <div>
        <Navbar />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#FFFFFF",
            color: "#fff",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              textAlign: "center",
              backgroundColor: "#0F1016",
              padding: "25px",
              borderRadius: "16px",
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: "100%",
                borderRadius: "16px",
                marginBottom: "10px",
              }}
            />
            <h2 style={{ color: "#aaa" }}>{car.name}</h2>
            <p style={{ color: "#aaa", paddingBottom: "15px" }}>
              {car.description}
            </p>

           
              <Button
                href="/cards"
                style={{
                  backgroundColor: "#FFCC03",
                  color: "#0F1016",
                  border: "none",
                  padding: "10px 100px",
                  marginTop: "30px",
                  margin:"6px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Back
              </Button>

              <Button
                href="/booking"
                style={{
                  backgroundColor: "#FFCC03",
                  color: "#0F1016",
                  border: "none",
                  padding: "10px 90px",
                  marginTop: "30px",
                  margin:"6px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Book Now
              </Button>
            
          </div>
        </div>
      </div>
    </>
  );
}
