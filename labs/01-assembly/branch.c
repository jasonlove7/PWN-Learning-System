int pick(int x) {
    int y;
    if (x > 0) {
        y = 1;
    } else {
        y = -1;
    }
    return y;
}

int main(void) {
    return pick(5) + pick(-5);
}
