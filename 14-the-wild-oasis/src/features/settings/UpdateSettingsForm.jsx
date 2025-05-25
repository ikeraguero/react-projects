import { updateSetting } from "../../services/apiSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const {settingUpdate, isUpdating} = useUpdateSetting();


  if (isLoading) return <Spinner />;

  const {
    min_booking_length: minBookingLength,
    max_booking_length: maxBookingLength,
    max_guests_per_booking: maxGuestsPerBooking,
    breakfast_price: breakfastPrice,
  } = settings;

  function handleUpdate(e, setting) {
    const { value } = e.target;
    settingUpdate({[setting]: value})
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "min_guests_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
