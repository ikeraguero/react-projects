import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    <>
      <Row typeof="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
