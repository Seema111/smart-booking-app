import MealSvg from '../assets/images/meal.svg'
import TestimonialImg1 from '../assets/images/face1.jpg';
import TestimonialImg2 from '../assets/images/face2.jpg';
import TestimonialImg3 from '../assets/images/face3.jpg';

export const caregivingData = [
  {
    uuid: 'd5d3b586-505c-48d9-b96a-601a99810cb1',
    speciality: 'Neurologists',
    languages: 'Nepali, English',
    ratings: 4.5,
    experience: '3 Years',
    bio: "Dr. Vikram Singh, Ph.D., is a distinguished medical professional with over 3 years of experience, having obtained her doctoral degree from renowned medical institutions including Johns Hopkins University. Dr. Vikram's illustrious career spans a diverse range of medical specialties, showcasing her exceptional breadth of knowledge and expertise.",
    user: {
      id: 4,
      email: 'cg1@gmail.com',
      username: 'caregiver1',
      first_name: 'Dr. Vikram',
      last_name: 'Singh',
      profile: {
        age: 20,
        gender: 'MALE',
        phone: '9890987876',
        address: 'KTM',
        profile_picture: null
      }
    }
  },
  {
    uuid: 'a33a46c6-8f91-4666-87d9-7789a7cc185a',
    speciality: 'Nepal Registered Nurse',
    languages: 'Nepali, English',
    ratings: 4.0,
    experience: '1 Year',
    bio: 'Mr. Sunil Shrestha is an experienced medical professional who obtained his nurse degree from Harvard medical school. He has worked for more than 10 years in various hospitals and possesses brilliant medical knowledge and a penchant for modern research in the medical field. Dr. Shrestha has established himself as a compassionate and dedicated healer.',
    user: {
      id: 5,
      email: 'cg2@gmail.com',
      username: 'caregiver2',
      first_name: 'Dr. Sunil',
      last_name: 'Shrestha',
      profile: {
        age: 35,
        gender: 'FEMALE',
        phone: '9890987876',
        address: 'KTM',
        profile_picture: null
      }
    }
  },
  {
    uuid: 'b9c7a4d9-3d1c-4c22-afe8-7205e870d09d',
    speciality: 'Cardiologists',
    languages: 'English, Hindi',
    ratings: 4.7,
    experience: '8 Years',
    bio: 'Dr. Aarav Gupta is a highly skilled and experienced cardiologist with a track record of delivering exceptional cardiac care to patients. With 8 years of practice, Dr. Gupta has earned a reputation for his precise diagnoses and effective treatment plans. He is dedicated to improving the heart health of his patients through compassionate care and advanced medical techniques.',
    user: {
      id: 6,
      email: 'cg3@gmail.com',
      username: 'caregiver3',
      first_name: 'Dr. Aarav',
      last_name: 'Gupta',
      profile: {
        age: 42,
        gender: 'MALE',
        phone: '9890987876',
        address: 'Delhi',
        profile_picture: null
      }
    }
  },
  {
    uuid: 'e6b1f4a3-1cf9-4f4f-91ab-47c076b460ec',
    speciality: 'Pediatricians',
    languages: 'English, Spanish',
    ratings: 4.8,
    experience: '12 Years',
    bio: 'Dr. Maria Rodriguez is a dedicated pediatrician with over 12 years of experience in providing compassionate care to children of all ages. She is known for her warm demeanor and ability to connect with young patients and their families. Dr. Rodriguez is committed to promoting the health and well-being of children through comprehensive medical care and education.',
    user: {
      id: 7,
      email: 'cg4@gmail.com',
      username: 'caregiver4',
      first_name: 'Dr. Maria',
      last_name: 'Rodriguez',
      profile: {
        age: 38,
        gender: 'FEMALE',
        phone: '9890987876',
        address: 'Madrid',
        profile_picture: null
      }
    }
  },
  {
    uuid: 'c5e9b2a1-2f2e-4b84-bde8-8326e55aee02',
    speciality: 'Orthopedic Surgeons',
    languages: 'English, French',
    ratings: 4.6,
    experience: '10 Years',
    bio: 'Dr. Jean-Luc Dubois is an esteemed orthopedic surgeon with a decade of experience in treating complex musculoskeletal conditions. Dr. Dubois is known for his surgical precision and compassionate approach to patient care. He is dedicated to restoring mobility and improving the quality of life for his patients through innovative orthopedic treatments.',
    user: {
      id: 8,
      email: 'cg5@gmail.com',
      username: 'caregiver5',
      first_name: 'Dr. Jean-Luc',
      last_name: 'Dubois',
      profile: {
        age: 45,
        gender: 'MALE',
        phone: '9890987876',
        address: 'Paris',
        profile_picture: null
      }
    }
  },
  {
    uuid: 'f2d8c3b7-aa4c-4325-a14a-9f02a5a180e9',
    speciality: 'Oncologists',
    languages: 'English, Chinese',
    ratings: 4.9,
    experience: '15 Years',
    bio: 'Dr. Li Wei is a renowned oncologist with over 15 years of experience in diagnosing and treating various types of cancer. Dr. Wei is committed to providing personalized care to each patient, combining the latest advancements in oncology with a compassionate approach. She is dedicated to improving cancer outcomes and enhancing the quality of life for her patients and their families.',
    user: {
      id: 9,
      email: 'cg6@gmail.com',
      username: 'caregiver6',
      first_name: 'Dr. Li',
      last_name: 'Wei',
      profile: {
        age: 50,
        gender: 'FEMALE',
        phone: '9890987876',
        address: 'Shanghai',
        profile_picture: null
      }
    }
  }
]

export const servicesDummyObject = [
  {
    icon: 'bi-chat-text',
    title: 'Daily Living Assistance',
    text: 'Help with bathing, dressing, grooming, toileting, and eating.'
  },
  {
    icon: 'bi-phone-flip',
    title: 'Social & Recreational Activities',
    text: 'We organize engaging events to build community and keep residents active.'
  },
  {
    icon: 'custom-image',
    image: MealSvg,
    title: 'Meal & Nutrition Services',
    text: 'Nutritious meals and snacks tailored to dietary needs.'
  },
  {
    icon: 'bi-heart-pulse',
    title: 'Medical Care & Monitoring',
    text: 'Vital‑sign checks and ongoing wellness monitoring.'
  }
]

export const testimonialsData = [
  {
    text: `I can't express enough gratitude for the caregiving services provided by Prana Home Care...`,
    stars: 5,
    name: 'Luna John',
    img: TestimonialImg1
  },
  {
    text: `I recently used Prana Home Care lab services for my medical testing needs and couldn't be more impressed...`,
    stars: 4,
    name: 'Kedar Bahadur',
    img: TestimonialImg2
  },
  {
    text: `Choosing Prana Home Care was the best decision we made for our family. Their team of caregivers provided exceptional support...`,
    stars: 3,
    name: 'Ram Shrestha',
    img: TestimonialImg3
  },
]
