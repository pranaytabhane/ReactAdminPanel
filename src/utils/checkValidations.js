import isEmail from 'validator/lib/isEmail';
export const checkValidations = (name, value, min = 4, max = 100) => {

  switch (name) {
    case 'email':
      return isEmail(value, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false, blacklisted_chars: '' });

    case 'password': {
      return (value.length >= 8) ? true : false;
    }
    default:
      return false;
  }
}