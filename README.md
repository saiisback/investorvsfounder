Here's a revised version of your project description, formatted and structured for a professional `README.md` file.

This version improves clarity, removes repetition, and organizes the information in a way that is easy for a developer or user to understand.

---

# Event Blockchain Marketplace

Welcome to the Event Blockchain Marketplace, a high-stakes platform built on the **Algorand** blockchain for a special event competition. This marketplace is designed for **20 participating teams** to manage funds, transact with each other, and track their financial standing in real-time.

The key feature is a unique **Decay Mechanism** designed to keep the market active and engaging.

## ⏳ The Decay Mechanism

To keep the competition dynamic and encourage activity, the marketplace features a unique **Decay Mechanism**.

> Every 15 minutes, a smart contract automatically applies a **5% balance reduction** to all registered teams. Stay active, transact, and invest wisely to offset the decay!

---

## ✨ Core Features

* **Team Registration:** A simple onboarding process where one member from each team registers their Algorand wallet address and team name.
* **Real-Time Dashboard:** View your team's current wallet balance, track overall equity, see accumulated penalties from the decay, and monitor a list of recent transactions.
* **Peer-to-Peer Transactions:** Instantly send funds to other teams. The "Invest" section allows you to select a team from the marketplace list or scan their **QR code** to initiate a transaction.
* **Marketplace Hub:** A central view listing all 20 registered teams, allowing for easy selection for transactions.
* **Breaking News Feed:** A real-time ticker displaying large, notable, or high-velocity transactions as they happen.

---

## 🛠️ Tech Stack

* **Blockchain:** Algorand
* **Smart Contracts:** Algorand Smart Contracts (ASCs) managing registration, P2P transactions, and the decay logic.
* **Frontend:** A web-based interface for all user interactions.
* **Transactions:** QR code integration for simplified wallet interactions.

---

## 🚀 User Flow

1.  **Onboarding (Registration)**
    * A new user opens the web application and is presented with the registration page.
    * They must enter their **Algorand wallet address** and their **Team Name**.
    * Upon successful registration, they are redirected to their main dashboard.

2.  **Main Dashboard**
    * **Navbar:** Displays the user's registered Team Name and notifications for key updates.
    * **Balance Card:** Shows the current wallet balance, equity, and total penalties accumulated from the decay mechanism.
    * **Recent Transactions:** A feed listing recent inbound and outbound transactions.
    * **Bottom Navbar:** Main navigation for the app.

3.  **Marketplace Section**
    * Accessible via the bottom navbar, this screen lists all 20 registered teams in the event.
    * Users can select a team from this list to initiate a transaction.

4.  **Invest / Transact Section**
    * Users can navigate here to send funds.
    * **Method 1 (List):** Select a team from the list to send funds to.
    * **Method 2 (QR Code):** Scan another team's QR code to initiate an investment/transaction.
    * All transactions are processed instantly via the Algorand smart contract.

---

## 📝 Smart Contract Logic

The smart contracts on the Algorand blockchain govern three core functionalities:

* **Registration:** Securely logs a team's wallet address and name, adding them to the event roster.
* **Transaction:** Facilitates the atomic peer-to-peer transfer of funds between registered wallets.
* **Decay:** A time-locked function that triggers every 15 minutes to apply the 5% balance reduction across all registered accounts.

---

## 🏁 Getting Started

1.  **Set up Wallet:** Ensure you have an active Algorand wallet (like Pera or MyAlgo) and are connected to the correct network specified by the event.
2.  **Register:** Navigate to the application URL and use the registration form to link your wallet address with your team name.
3.  **Explore:** You will be redirected to your dashboard. From here, you can check your balance, view the marketplace, and see recent transactions.
4.  **Stay Active!** Remember the 15-minute decay. Engage with the marketplace, make strategic investments, and transact frequently to maintain your standing!
