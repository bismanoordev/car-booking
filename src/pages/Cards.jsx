import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BasicExample() {
  const navigate = useNavigate();

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstKPpsME6xflKQRwt4Qh8FdX52pCLBQB6Pw&s",
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80",
    "https://i.dawn.com/primary/2017/02/589aab7c8227d.jpg",
    "https://www.rushlane.com/wp-content/uploads/2021/01/2022-renault-duster-new-gen-suv-1.jpg",
    "https://www.motoroids.com/wp-content/uploads/2019/03/2019-Ford-Figo-drift.jpg",
    "https://parkers-images.bauersecure.com/wp-images/116/driving-moving-exterior/930x620/59-mercedes-benz-gle-review.jpg",
    "https://stimg.cardekho.com/images/carexteriorimages/630x420/MG/Hector/13125/1765801652897/exterior-image-164.jpg",
    "https://images.financialexpressdigital.com/2020/09/mahindra-thar.jpg",
    "https://carsales.pxcrush.net/carsales/cars/dealer/7orlvr1e6hr9lhuvnjre6wvz6.jpg?pxc_method=fitfill&pxc_bgtype=self&pxc_size=720,480",
    "https://hips.hearstapps.com/hmg-prod/images/ineos-automotive-grenadier-1593568374.jpg?crop=0.623xw:0.697xh;0.245xw,0.207xh&resize=640:*",
    "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25710326/ToyotaLandCruiserROX_01_2.jpg?quality=90&strip=all",
    "https://www.gari.pk/images/new/cars/2022-05/1915_1_71176.jpg",
  ];

  const headings = [
    "ALTROZ",
    "BREZZA",
    "CIAZ",
    "DUSTER",
    "FIGO",
    "GLE",
    "HECTOR",
    "THAR",
    "JIMNY",
    "LAND ROVER",
    "TOYOTA",
    "SUZUKI",
  ];

  const descriptions = [
    "Altroz ek stylish aur safe hatchback hai.",
    "Brezza ek sporty aur reliable SUV hai.",
    "Ciaz ek elegant aur fuel-efficient sedan hai.",
    "Duster ek tough aur reliable SUV hai.",
    "Figo ek compact aur efficient hatchback hai.",
    "GLE ek luxury aur powerful SUV hai.",
    "Hector ek stylish aur feature-rich SUV hai.",
    "Thar ek rugged aur iconic SUV hai.",
    "Jimny ek compact aur off-road SUV hai.",
    "Land Rover ek premium aur rugged SUV hai",
    "Toyota reliable aur fuel-efficient cars banata hai",
    "Suzuki efficient aur reliable cars banata hai.",
  ];

  const totalCards = 12;

  return (
    <>
    <Navbar/>
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        justifyItems: "center",
        alignContent: "start",
      }}
    >
      {Array.from({ length: totalCards }).map((_, index) => (
        <Card
          key={index}
          style={{
            width: "19rem",
            borderRadius: "12px",
            overflow: "hidden",
            border: "none",
            backgroundColor: "#0F1016",
            boxShadow: "0 8px 20px rgba(255, 205, 3, 0.29)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 14px 30px rgba(255, 205, 3, 0.37)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(255, 205, 3, 0.23)";
          }}
        >
          <Card.Img
            variant="top"
            src={images[index % images.length]}
            style={{
              height: "190px",
              objectFit: "cover",
              width: "100%",
            }}
          />

          <Card.Body style={{ padding: "14px" }}>
            <Card.Title
              style={{
                fontWeight: "700",
                fontSize: "18px",
                color: "#FFFFFF",
                marginBottom: "6px",
                textAlign: "center",
              }}
            >
              {headings[index % headings.length]} 
            </Card.Title>

            <Card.Text
              style={{
                fontSize: "14px",
                color: "#797878ff",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {descriptions[index % descriptions.length]}{" "}
              
            </Card.Text>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => navigate(`/car/${index}`)}
                style={{
                  backgroundColor: "#FFCC03",
                  border: "none",
                  color: "#0F1016",
                  fontWeight: "600",
                  padding: "6px 14px",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              >
                View
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    </>
  );
}

export default BasicExample;
