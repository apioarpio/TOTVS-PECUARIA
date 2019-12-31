import getMAC, {isMAC} from 'getmac';

export default {
    getMACAddress() {
        return getMAC();
    },
    checkMACAdress(macAdress) {
        return isMAC(macAdress);
    }
}
