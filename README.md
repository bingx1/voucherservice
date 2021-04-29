# Voucher service
Created for SWEN90016.
https://voucherservice.vercel.app/

## Requirements
1. The system is identified as Voucher_Service
2. The super admin user is hard coded to Tianyi. This user is referred to the Admin. The Admin has a pre-defined and system recognizable email username and a default initial password for login (you do not have to provide an interface to enter this). 
3. The Admin user can add new services to the system by providing the type of the service, referred to as Voucher_Service_Type (see pdf)
4. Customer(initially only the employees of NYD) can register in the system by providing the following Personal_Information: (see pdf)
5. Customer can add separate Biller_Information at any time after registration: 
  - Name on invoice
  - Biller email address
6. Customer can log into the system using their registered email address and password.
7. Logged in Customer can update their Personal_Information and Biller_Information. 
8. Logged in Customer can redeem their vouchers, by requesting a Voucher_Booking. (see pdf))
9. When the Customer completes the Voucher_Booking, the system must send an email to the Admin with the following information regarding the booking (see pdf)
10. When the Admin accepts the Voucher_Booking on behalf of the service provider,the system must send an email to the Customer with the following information regarding the booking (see pdf)
11. Logged in Customer must be able to view or cancel their Voucher_Booking. If a Customer cancels a booking, an email must be sent to the Admin with information in requirement (9)-(a) & (b) and a booking cancellation message.
12. Admin user must be able to view a list of all Voucher_Booking requests for all Voucher_Service_Types
13. Admin, Customer, Personal_Information,Biller_Information,Voucher_Service_Typeand Voucher_Booking informationmust be persisted in the system (stored in a database).



---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
