
export function validateCheckout(form) {
  const errors = {};

  const name = (form.name ?? '').trim();
  const email = (form.email ?? '').trim();
  const phone = (form.phone ?? '').trim();
  const address = (form.address ?? '').trim();
  const city = (form.city ?? '').trim();
  const state = (form.state ?? '').trim();
  const pincode = (form.pincode ?? '').trim();

  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[0-9+\s()-]{8,20}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  } else if (phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Phone number must contain at least 10 digits.';
  }

  if (!address) {
    errors.address = 'Street address is required.';
  } else if (address.length < 5) {
    errors.address = 'Enter a complete street address.';
  }

  if (!city) {
    errors.city = 'City is required.';
  }

  if (!state) {
    errors.state = 'State is required.';
  }

  if (!pincode) {
    errors.pincode = 'PIN code is required.';
  } else if (!/^[0-9]{6}$/.test(pincode)) {
    errors.pincode = 'PIN code must contain exactly 6 digits.';
  }

  return errors;
}
